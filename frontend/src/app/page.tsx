import React from "react";

import HomeClient from "@/app/HomeClient";

export default function Home(): React.JSX.Element {
    return <HomeClient renderedAt={new Date().toISOString()} />
}
