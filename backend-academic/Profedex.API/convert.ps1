$path = "Program.cs"
$content = Get-Content $path
Set-Content -Path $path -Value $content -Encoding utf8
