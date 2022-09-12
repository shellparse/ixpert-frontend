export default function RowActions ({row}) {
    
    function handleClick(e){
        alert('you are now editing row :'+row.id)
    }
    return (
    <>
    <button onClick={handleClick} name={row.id}>edit</button>
    </>
    )
}