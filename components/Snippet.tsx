import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { EditIcon, Link, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";

const Snippet = ({
  children,
  language,
}: {
  children: React.ReactNode;
  language: string;
}) => {
  
  const highlightedCode = hljs.highlight(language, children as string).value;

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <pre className="w-full shadow-sm bg-zinc-900 text-white border rounded-lg p-2 overflow-x-auto">
        <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedCode }}/>
      </pre>
      <div className="gap-x-2 flex items-center self-start">
        <Button>
          <EditIcon />
        </Button>
        <Button variant="destructive">
          <TrashIcon />
        </Button>
        <Button variant="outline">
          <Link />
        </Button>
      </div>
    </div>
  );
};

export default Snippet;
