interface ListWrapper{
    children: React.ReactNode
}


const ListWrapper = ({
    children
}:ListWrapper) => {
    return (
        <li
            className="
                w-[272px]
                h-full
                shrink-0
                select-none
            "
        >
            {children}
        </li>
    );
}
 
export default ListWrapper;