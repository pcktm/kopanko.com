import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

type CommentsProps = {
  term: string;
};

export default function Comments({ term }: CommentsProps) {
  // const [theme, setTheme] = useState(
  //   window.matchMedia("(prefers-color-scheme: dark)").matches
  //     ? "transparent_dark"
  //     : "light",
  // );
  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  //   const listener = (e: MediaQueryListEvent) => {
  //     const newTheme = e.matches ? "transparent_dark" : "light";
  //     setTheme(newTheme);
  //   };
  //   mediaQuery.addEventListener("change", listener);
  //   return () => mediaQuery.removeEventListener("change", listener);
  // }, []);
  const theme = "light";
  return (
    <Giscus
      repo="pcktm/kopanko.com"
      repoId="MDEwOlJlcG9zaXRvcnkzNDYxMDY1NDY="
      category="General"
      categoryId="DIC_kwDOFKEqss4CVcOe"
      mapping="specific"
      term={term}
      reactionsEnabled="1"
      theme={theme}
      lang="en"
    />
  );
}
