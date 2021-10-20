
const Share = async ({ shareData = {} }) => {
    if (navigator.share) {
        await navigator.share(shareData).then(
            () => { }
        ).catch(() => {
            // alert("Share is Not Supported! Please contact Support")
        })
    }
}

export default Share;