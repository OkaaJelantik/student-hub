{ pkgs, lib, config, inputs, ... }:

{
  languages.javascript = {
    enable = true;
  };

  env = {
    NPM_CONFIG_FUND = "false";
    NPM_CONFIG_AUDIT = "false";
  };

  git-hooks.hooks = {
    prettier = {
      enable = true;
      entry = "${pkgs.prettier}/bin/prettier --write";
      files = "\\.(js|jsx|ts|tsx|json|css|md|html)$";
    };
  };
}
