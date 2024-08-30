type Repo = {
    id: string;
    name: string;
    description: string
    full_name: string;
    private: boolean;
    owner: {
        login: string;
    }
}

type Commit = {
    sha: string,
    commit: {
       author: {
        date: Date
       },
       message: string
    }
}