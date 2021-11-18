
const Share = async ({ shareData = {} }) => {
    if (navigator.share) {
        await navigator.share(shareData).then(
            () => { }
        ).catch(() => {
            console.log("hey")
            navigator.clipboard.writeText(shareData.url)
        })
    } else {
        navigator.clipboard.writeText(shareData.url)
        // Modal to notify that the link has been copied
    }
}

export default Share;