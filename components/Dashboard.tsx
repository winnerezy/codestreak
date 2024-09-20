"use client";

import { cn } from "@/lib/utils";
import Snippet from "./Snippet";
import { Button, buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import hljs from "highlight.js";
import { useEffect, useState } from "react";
import { Snippet as SnippetProps } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveSnippet } from "@/lib/actions";

const Dashboard = () => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState("jsx")

  const [snippets, setSnippets] = useState<SnippetProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  useEffect(() => {
  
    async function fetchSnippets() {
      const response = await fetch("/api/snippets");
      const data = await response.json();
      setSnippets(data);
     
    }
    fetchSnippets();
  }, []);

  const handleCreate = async () => {
    setIsLoading(true) 
    await saveSnippet(code, language)
    setIsLoading(false)
    setIsDialogOpen(false)
  }

  console.log(snippets)
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h5 className="text-2xl font-semibold">My Snippets</h5>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className={cn(buttonVariants())}>
            Add Snippet
          </DialogTrigger>
          <DialogContent className="w-full max-w-[1000px] h-[600px] px-4 mx-2 flex flex-col">
            <DialogHeader>
              <DialogTitle>Create Code Snippet</DialogTitle>
            </DialogHeader>
            <textarea
              className="w-full h-full border outline-none p-2 rounded-md resize-none bg-transparent"
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />
            <DialogFooter className="flex gap-2">
              <Select  onValueChange={(e) => setLanguage(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="JSX" defaultValue={"jsx"}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jsx">JSX</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="js">JS</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={() => handleCreate()} disabled={isLoading}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {
          snippets && snippets.length > 0 ? snippets.map((snippet) => (
            <Snippet key={snippet.id} language={'jsx'}>
              {snippet.content}
            </Snippet>
          )) : <p>No snippets found</p>
        }
      </div>
    </div>
  );
};

export default Dashboard;
