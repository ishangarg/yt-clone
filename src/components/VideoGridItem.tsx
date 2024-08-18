type VideoGridItemProps = {
    id: string
    title: string
    channel: {
        id: string
        name: string
        profileUrl: string
    }
    views: number
    postedAt: Date
    duration: number
    thumbnailUri: string
    videoUri: string

}

export function VideoGridItem({id, title, channel, views, postedAt, duration, thumbnailUri, videoUri}:VideoGridItemProps){

    return <div className="flex flex-col gap-2">
        <a href={`?watch?v=${id}`}>
            
        </a>
    </div>

}