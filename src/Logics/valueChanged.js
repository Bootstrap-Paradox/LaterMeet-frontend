
export default function ValueChanged({ matchFor = {}, matchWith = {} }) {
    let changed = false;
    Object.keys(matchFor).map((key) => {
        if (matchFor[key] !== matchWith[key]) changed = true;
    })
    return changed;
}