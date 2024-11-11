import Image from "next/image";

const images = [
  "/marketing_1.jpg",
  "/marketing_2.jpg",
  "/marketing_3.jpg",
  "/marketing_4.jpg",
  "/marketing_5.jpg",
  "/marketing_6.jpg",
];
export default function ImageGrid() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((img, index) => {
        return (
          <Image
            className="h-full w-full rounded-lg object-cover"
            src={img}
            alt="marketing"
            width={500}
            height={500}
            quality={100}
            key={index}
          />
        );
      })}
    </div>
  );
}
