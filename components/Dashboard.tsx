"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, formatRelative } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import Skeleton from '@mui/material/Skeleton';
import { Button, CircularProgress } from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  "max-width": 700,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor: "#0a0a0a"
};
const Dashboard = () => {
  const [commits, setCommits] = useState<Commit[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    data: repos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["repositories"],
    queryFn: async () => {
      const res = await axios("/api/repos");
      const ans: Repo[] = res.data;
      return ans;
    },
  });

  const fetchCommits = useCallback(async () => {
    setLoading(true);
    if (!repos) return;
    const commitList: Commit[] = [];
    for (const repo of repos) {
      const res = await axios(`/api/commits/${repo.name}`);

      commitList.push(...res.data);
    }
    setCommits(
      commitList.sort(
        (a, b) =>
          new Date(b.commit.author.date).getTime() -
          new Date(a.commit.author.date).getTime()
      )
    );
    setLoading(false);
  }, [repos]);

  useEffect(() => {
    if (repos) {
      fetchCommits();
    }
  }, [repos, fetchCommits]);
  return (
    <section className="space-y-6">
      <div className="flex gap-4 items-center w-full">
        {isLoading || loading ? (
        <>
         <Skeleton variant="rectangular" animation={"wave"} className="bg-zinc-600 rounded-md" width={300} height={80} />
         <Skeleton variant="rectangular" animation={"wave"} className="bg-zinc-600 rounded-md" width={300} height={80} />
        </>
        ) : (
          commits && (
           <div className="flex gap-4">
             <div className="flex font-semibold border border-gray-500 rounded-md w-[300px] h-[80px] text-2xl items-center justify-center">
              {commits.length} Total Commits
            </div>
            <div className="flex font-semibold border border-gray-500 rounded-md w-[300px] h-[80px] text-2xl items-center justify-center">
              {commits.filter(commit => format(new Date(commit.commit.author.date), "yyyy-MM-dd") == format(new Date(), "yyyy-MM-dd")).length } Commits Today
            </div>
           </div>
          )
        )}
      </div>
      <div className="p-10 border border-gray-300 rounded-lg flex flex-col gap-2">
        <h4 className="text-2xl font-semibold">Recent Commits</h4>
        <section className="flex flex-col gap-2 p-2 overflow-y-auto border border-gray-400 h-[600px]">
          {isLoading || loading ? (
            <div className="flex h-full items-center justify-center">
                <CircularProgress className="text-foreground" />
            </div>
          ) : error ? (
            <div className="flex flex-col gap-2 self-center">
              <BiXCircle className="text-error" />
              <span>Error Found</span>
            </div>
          ) : (
            commits &&
            commits.slice(0, 10).map((commit) => (
              <div
                className="rounded-md border border-gray-400 w-full h-36"
                key={commit.sha}
              >
                <div className="flex items-center justify-between p-2 w-[100vw-150px]">
                  <div className="flex flex-col">
                    <h2 className="line-clamp-2">{commit.commit.message}</h2>
                    {/* <p className="text-sm truncate w-[200px]">
                    {repo.description}
                  </p> */}
                    <p>
                      {formatRelative(commit.commit.author.date, new Date())}
                    </p>
                  </div>
                  <Button onClick={handleOpen} className="bg-white hover:bg-white/90 w-36 h-12">Tweet</Button>
            
            
                </div>
              </div>
            ))
          )}
        </section>
      </div>
      <div>
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="px-4"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
    </section>
  );
};

export default Dashboard;
