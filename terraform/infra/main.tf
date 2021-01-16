data "aws_ami" "amazon_linux_2" {
  most_recent = true

  filter {
    name   = "name"
    values = [ "amzn2-ami-hvm-2.0*" ]
  }

  owners = [ "amazon" ]
}

resource "aws_instance" "web_service" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = "t2.micro"

  tags = var.tags
}