export default function Enum(a) {
  let i = Object
    .keys(a)
    .reduce((o, k)=>(o[a[k]] = k, o), {});

  return Object.freeze(
    Object.keys(a).reduce(
      (o, k)=>(o[k] = a[k], o), v=>i[v]
    )
  );
}
