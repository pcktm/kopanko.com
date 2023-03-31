import Giscus from '@giscus/react';

type CommentsProps = {
  term: string;
};

export default function Comments(
  {
    term,
  }: CommentsProps,
) {
  return (
    <Giscus
      repo="pcktm/kopanko.com"
      repoId="MDEwOlJlcG9zaXRvcnkzNDYxMDY1NDY="
      category="General"
      categoryId="DIC_kwDOFKEqss4CVcOe"
      mapping="specific"
      term={term}
      reactionsEnabled="1"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}
