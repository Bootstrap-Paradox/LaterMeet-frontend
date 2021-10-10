
export default function ValueChanged({ matchFor = {}, matchWith = {} }) {

    Object.keys(matchFor).map((key) => {
        if (matchFor[key] !== matchWith[key]) return true;
    })
    return false;
}