import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

const ami = pulumi.output(aws.ec2.getAmi({
    filters: [
        {
            name: "name",
            values: ["amzn-ami-hvm-*"],
        },
    ],
    owners: ["amazon"],
    mostRecent: true,
}));

const server = new aws.ec2.Instance("someserver", {
    instanceType: "t2.micro",
    ami: ami.id,
});

// Export the name of the bucket
export const bucketName = bucket.id;
export const publicIp = server.publicIp;
