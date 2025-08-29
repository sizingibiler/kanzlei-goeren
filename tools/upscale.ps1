$ErrorActionPreference = 'Stop'
$base = "C:\\Users\\TT\\CLONE\\avukat\\public"
$imgDir = Join-Path $base 'images'
$iconDir = Join-Path $imgDir 'icons'

# Collect source raster assets
$files = @()
if (Test-Path $imgDir)  { $files += Get-ChildItem -Path $imgDir -Include *.jpg,*.jpeg,*.png -File -Recurse | Where-Object { $_.DirectoryName -notmatch '\\icons$' } }
if (Test-Path $iconDir) { $files += Get-ChildItem -Path $iconDir -Include *.jpg,*.jpeg,*.png -File -Recurse }
$logo = Join-Path $base 'logo.jpeg'
if (Test-Path $logo) { $files += Get-Item $logo }

function New-WebP {
  param(
    [Parameter(Mandatory=$true)][string]$InPath,
    [Parameter(Mandatory=$true)][string]$OutPath,
    [int]$Quality = 82,
    [string]$Scale = 'min(iw*2,2560):-2',
    [switch]$IsIcon
  )
  if (-not (Test-Path $InPath)) { throw "Input not found: $InPath" }
  $outDir = Split-Path -Parent $OutPath
  if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }
  $q = $Quality
  $vf = "scale=$Scale:flags=lanczos"
  & ffmpeg -hide_banner -loglevel error -y -i "$InPath" -vf $vf -c:v libwebp -q:v $q "$OutPath"
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $OutPath)) { throw "ffmpeg failed to write: $OutPath (code=$LASTEXITCODE)" }
}

function New-WebP-AspectVariants {
  param(
    [Parameter(Mandatory=$true)][string]$Src,
    [Parameter(Mandatory=$true)][string]$OutBase,
    [Parameter(Mandatory=$true)][string]$AspectName,
    [Parameter(Mandatory=$true)][int]$Num,   # width ratio
    [Parameter(Mandatory=$true)][int]$Den,   # height ratio
    [Parameter(Mandatory=$true)][int[]]$Widths,
    [int]$Quality = 82
  )
  if (-not (Test-Path $Src)) { throw "Input not found: $Src" }
  foreach ($W in $Widths) {
    $H = [int][Math]::Round($W * $Den / $Num)
    $out = Join-Path $variantsDir ("{0}-{1}-{2}.webp" -f $OutBase, $AspectName, $W)
    $outDir = Split-Path -Parent $out
    if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }
    if (Test-Path $out) {
      $srcTime = (Get-Item $Src).LastWriteTimeUtc
      $dstTime = (Get-Item $out).LastWriteTimeUtc
      if ($dstTime -ge $srcTime) { continue }
    }
    $vf = "scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1"
    & ffmpeg -hide_banner -loglevel error -y -i "$Src" -vf $vf -c:v libwebp -q:v $Quality "$out"
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path $out)) { throw "ffmpeg failed to write variant: $out (code=$LASTEXITCODE)" }
    Write-Host ("[Variant] ${OutBase} ${AspectName} ${W}w -> $out")
  }
}

foreach ($f in $files) {
  $out = [System.IO.Path]::ChangeExtension($f.FullName, 'webp')
  # Skip if destination is newer than source
  if (Test-Path $out) {
    $srcTime = (Get-Item $f.FullName).LastWriteTimeUtc
    $dstTime = (Get-Item $out).LastWriteTimeUtc
    if ($dstTime -ge $srcTime) { continue }
  }

  if ($f.FullName.StartsWith($iconDir)) {
    Write-Host ("[Icon]  {0} -> {1}" -f $f.FullName, $out)
    New-WebP -InPath $f.FullName -OutPath $out -Quality 88 -Scale 'min(iw*1.5,1024):-2' | Out-Null
  } elseif ($f.FullName -eq $logo) {
    Write-Host ("[Logo]  {0} -> {1}" -f $f.FullName, $out)
    New-WebP -InPath $f.FullName -OutPath $out -Quality 90 -Scale 'min(iw*2,1024):-2' | Out-Null
  } else {
    Write-Host ("[Photo] {0} -> {1}" -f $f.FullName, $out)
    New-WebP -InPath $f.FullName -OutPath $out -Quality 82 -Scale 'min(iw*2,2560):-2' | Out-Null
  }
}

# Art-directed hero variants (desktop ultrawide, desktop 16:9, mobile tall)
$variantsDir = Join-Path $imgDir 'variants'
if (-not (Test-Path $variantsDir)) { New-Item -ItemType Directory -Path $variantsDir | Out-Null }

function Resolve-FirstExisting {
  param([string[]]$Candidates)
  foreach ($c in $Candidates) { if (Test-Path $c) { return $c } }
  return $null
}

$heroSrc = Resolve-FirstExisting @(
  (Join-Path $imgDir 'hero-background.jpeg'),
  (Join-Path $imgDir 'hero-background.jpg'),
  (Join-Path $imgDir 'hero-background.png'),
  (Join-Path $imgDir 'hero-background.webp')
)
if ($heroSrc) {
  # Ultra-wide (32:9, 21:9), very wide (2:1), standard wides (16:9, 16:10), and classic/tall (3:2, 4:3, 3:4)
  New-WebP-AspectVariants -Src $heroSrc -OutBase 'hero-background' -AspectName '32x9'  -Num 32 -Den 9 -Widths @(2560,3440,3840) -Quality 82
  New-WebP-AspectVariants -Src $heroSrc -OutBase 'hero-background' -AspectName '21x9'  -Num 21 -Den 9 -Widths @(1920,2560,3440) -Quality 82
  New-WebP-AspectVariants -Src $heroSrc -OutBase 'hero-background' -AspectName '2x1'   -Num 2  -Den 1 -Widths @(1440,1920,2560) -Quality 82
  New-WebP-AspectVariants -Src $heroSrc -OutBase 'hero-background' -AspectName '16x10' -Num 16 -Den 10 -Widths @(1600,1920,2560) -Quality 82
  New-WebP-AspectVariants -Src $heroSrc -OutBase 'hero-background' -AspectName '16x9'  -Num 16 -Den 9 -Widths @(1280,1920,2560) -Quality 82
  New-WebP-AspectVariants -Src $heroSrc -OutBase 'hero-background' -AspectName '3x2'   -Num 3  -Den 2 -Widths @(1440,1800,2160) -Quality 82
  New-WebP-AspectVariants -Src $heroSrc -OutBase 'hero-background' -AspectName '4x3'   -Num 4  -Den 3 -Widths @(1440,1920,2048) -Quality 82
  New-WebP-AspectVariants -Src $heroSrc -OutBase 'hero-background' -AspectName '3x4'   -Num 3  -Den 4 -Widths @(768,1080,1440)  -Quality 82
}

$aboutSrc = Resolve-FirstExisting @(
  (Join-Path $imgDir 'about-concept.jpeg'),
  (Join-Path $imgDir 'about-concept.jpg'),
  (Join-Path $imgDir 'about-concept.png'),
  (Join-Path $imgDir 'about-concept.webp')
)
if ($aboutSrc) {
  New-WebP-AspectVariants -Src $aboutSrc -OutBase 'about-concept' -AspectName '16x9' -Num 16 -Den 9 -Widths @(1280,1920,2560) -Quality 82
  New-WebP-AspectVariants -Src $aboutSrc -OutBase 'about-concept' -AspectName '3x4'  -Num 3  -Den 4 -Widths @(768,1080,1440)  -Quality 82
}

Write-Host ("Done. Processed {0} images and generated hero variants." -f $files.Count)

