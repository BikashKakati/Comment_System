export type CommentType = {
    userName:string,
    message:string,
    replies:CommentType[]
}

export const commentsData:CommentType[] = [
    {
        userName: `bikash${Math.trunc(Math.random()*10)+Date.now()}`,
        message: "awesome work",
        replies: [
            {
                userName: `varun${Math.trunc(Math.random()*10)+Date.now()}`,
                message: "I also want to do someday",
                replies: []
            },
            {
                userName: `jipsam${Math.trunc(Math.random()*10)+Date.now()}`,
                message: "It's true",
                replies: [
                    {
                        userName: `billu${Math.trunc(Math.random()*10)+Date.now()}`,
                        message: "feel free to ask further",
                        replies: []
                    }
                ]
            }
        ]
    },


]