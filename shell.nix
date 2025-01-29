{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  name = "web-development";
  buildInputs = [
    pkgs.nodejs
    pkgs.corepack
  ];
  shellHook = ''
    echo "Web Delopment Environment Used"
  '';
}
