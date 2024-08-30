import { getCurrentUser } from "@/utils/actions";
import { octokit } from "@/utils/octokit";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params: { repo } }: { params: { repo: string } } ) => {
    try {
        const user = await getCurrentUser()
    
        if(!user){
            return NextResponse.json(JSON.stringify({ message: 'Unauthorized' }), {
                status: 401
            })
        }
        const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: user.username,
            repo,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
          return NextResponse.json(commits.data)
    } catch (error) {
        return NextResponse.json(JSON.stringify({ message: 'Imternal Server Error' }), {
            status: 401
        })
    }
}