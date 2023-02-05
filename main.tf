provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "websitehosting" {
  bucket = "tictactoewebpagehosting"
}

resource "aws_s3_bucket_website_configuration" "websitehostingconf" {
  bucket = aws_s3_bucket.websitehosting.bucket
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.websitehosting.id
  policy = file("policy.json")
}

resource "aws_s3_bucket_acl" "acl" {
  bucket = aws_s3_bucket.websitehosting.id

  acl = "public-read"
}




resource "aws_s3_object" "index_html" {
  bucket       = aws_s3_bucket.websitehosting.bucket
  key          = "index.html"
  source       = "index.html"
  content_type = "text/html"
}

resource "aws_s3_object" "myscripts_js" {
  bucket       = aws_s3_bucket.websitehosting.bucket
  key          = "myscripts.js"
  source       = "myscripts.js"
  content_type = "application/javascript"
}

resource "aws_s3_object" "styles_css" {
  bucket       = aws_s3_bucket.websitehosting.bucket
  key          = "styles.css"
  source       = "styles.css"
  content_type = "text/css"
}

resource "aws_s3_object" "error_html" {
  bucket       = aws_s3_bucket.websitehosting.bucket
  key          = "error.html"
  source       = "error.html"
  content_type = "text/html"
}

