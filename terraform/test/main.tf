provider "aws" {
  region = "eu-west-2"
}

module "infra" {
  source = "../infra"


  tags = {
    Name = "test"
  }
}