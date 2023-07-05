-- CreateTable
CREATE TABLE "Links" (
    "shortUrl" TEXT NOT NULL,
    "longUrl" TEXT NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("shortUrl")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_shortUrl_key" ON "Links"("shortUrl");
