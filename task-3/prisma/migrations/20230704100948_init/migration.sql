-- CreateTable
CREATE TABLE "Bucket" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Bucket_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "JsonData" (
    "name" TEXT NOT NULL,
    "bucketName" TEXT NOT NULL,

    CONSTRAINT "JsonData_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "JsonData" ADD CONSTRAINT "JsonData_bucketName_fkey" FOREIGN KEY ("bucketName") REFERENCES "Bucket"("name") ON DELETE CASCADE ON UPDATE CASCADE;
