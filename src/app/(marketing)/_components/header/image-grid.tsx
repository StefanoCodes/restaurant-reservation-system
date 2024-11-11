import Image from "next/image";
export default function ImageGrid({ images }: { images: string[] }) {
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
