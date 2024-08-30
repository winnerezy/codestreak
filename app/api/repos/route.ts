import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../utils/actions"
import axios, { AxiosError } from "axios"
import { octokit } from "@/utils/octokit";

export const GET = async (req: NextRequest) => {
    try{
        const user = await getCurrentUser()

        if(!user){
            return NextResponse.json(JSON.stringify({ message: 'Unauthorized' }), {
                status: 401
            })
        }

        // const res = await axios.get(`https://api.github.com/users/${user.username}/repos/`)
        // const repositories = res.data

        const repositories = await octokit.request('GET /users/{username}/repos', {
            username: user.username,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
        })
    
        if(!repositories){
            return NextResponse.json(JSON.stringify({ message: 'No Repositories Found' }), {
                status: 404
            })
        }
    
        return NextResponse.json(repositories.data)
    } catch (error){
        if(error instanceof AxiosError){
            console.log(error.message)
          return NextResponse.json(JSON.stringify({ message: error.message }), {
              status: 500
            })
        }
        return NextResponse.json(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500
        })
    }
}