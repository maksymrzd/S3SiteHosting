<h1 align="center">Hosting static website on AWS</h1>
<h2 align="center">Using Terraform</h2>

First of all, to host a static website we need to create an s3 bucket.
`aws_s3_bucket` resource is required for bucket creation, that's how it should look like:
```tf
resource "aws_s3_bucket" "websitehosting" {
  bucket = "tictactoewebpagehosting"
}
```
