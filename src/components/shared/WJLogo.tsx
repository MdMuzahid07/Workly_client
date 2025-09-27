import Image from "next/image";
import Link from "next/link";

const WJLogo = () => {
  return (
    <Link href="/" className="text-foreground text-xl font-bold">
      <Image
        src="/logo/workly_job-logo.png"
        alt="Workly Job Logo"
        width={50}
        height={30}
        className="h-8 w-auto"
        priority
      />
    </Link>
  );
};

export default WJLogo;
