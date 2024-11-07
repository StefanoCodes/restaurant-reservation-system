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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((img, index) => {
        return (
          <Image
            className="h-full w-full object-cover"
            src={img}
            alt="marketing"
            width={250}
            height={169}
            key={index}
          />
        );
      })}
    </div>
  );
}
