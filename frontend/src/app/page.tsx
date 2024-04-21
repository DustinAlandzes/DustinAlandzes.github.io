'use client';

import RoomScene from "@/components/RoomScene";

export default function Home() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-cyan-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <a href={"https://github.com/DustinAlandzes"} target={"_blank"}>Dustin Alandzes</a>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Beware of finding what you&apos;re looking for.&rdquo;
              </p>
              <footer className="text-sm">Richard Hamming</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 h-full" style={{ padding: 0}}>
            <RoomScene/>
        </div>
      </div>
    </>
  )
}
