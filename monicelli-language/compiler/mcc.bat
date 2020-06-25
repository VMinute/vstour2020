@echo off



FOR /F "tokens=*" %%g IN (
'wsl.exe wslpath %1'
) do (
    SET compiler=%%g
)

FOR /F "tokens=*" %%g IN (
'wsl.exe wslpath %2'
) do (
    SET inputfile=%%g
)

FOR /F "tokens=*" %%g IN (
'wsl.exe wslpath %3'
) do (
    SET outputfile=%%g
)


wsl %compiler% -o %outputfile% %inputfile%
