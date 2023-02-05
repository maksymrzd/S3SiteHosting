<h1 align="center">Hosting static website on AWS</h1>
<h2 align="center">Using Terraform</h2>

First of all, to host a static website we need to create an s3 bucket.<br>
`aws_s3_bucket` resource is required for bucket creation, that's how it should look like:
```tf
resource "aws_s3_bucket" "websitehosting" {
  bucket = "tictactoewebpagehosting"
}
```
Next, we need to enable static website hosting and configure it.<br>
We can do it with `aws_s3_bucket_website_configuration` resource.<br>
Here we specify bucket id in bucket line, and also index.html and error.html files for our site:
```tf
resource "aws_s3_bucket_website_configuration" "websitehostingconf" {
  bucket = aws_s3_bucket.websitehosting.bucket
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }
}
```
Then, we have to make our bucket publicly accessible for all users to view our hosted site.<br>
`aws_s3_bucket_policy` and `aws_s3_bucket_acl` resources can help us with that.<br>
We specify policy through the policy.json file and allow everyone to read our files with acl.<br>
```tf
resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.websitehosting.id
  policy = file("policy.json")
}

resource "aws_s3_bucket_acl" "acl" {
  bucket = aws_s3_bucket.websitehosting.id

  acl = "public-read"
}
```
The last thing that we need to do is to upload files required for our site.<br>
We can do this with `aws_s3_object` resource.<br>
In each block we have to specify the following things:
<ul>
<li>bucket id</li>
<li>key(name of our file)</li> 
<li>source(where our file is located)</li> 
<li>content-type for our files to work properly.</li>
</ul>

That's what it should look like: <br>

```tf
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
```

After applying our terraform code, we can go to our bucket properties, scroll down to static website hosting block and click on our link to access the site.<br>
![image](https://user-images.githubusercontent.com/114437342/216842650-88b1bb06-44d4-48bb-a5a5-16f804a7ba1d.png)



