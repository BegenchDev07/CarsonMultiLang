import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import React,{ useState, useEffect } from "react";
import { productsApi } from '../services/api';


interface SearchBarStatus {
    isOpen: boolean;
}

const SearchBar: React.FC<SearchBarStatus> = ({isOpen}) => {
  const [page, setPage] = useState<"root" | "projects">("root");
  const [open, setOpen] = useState<boolean>(isOpen);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<any>(null)  
  
  useEffect(()=>{
    const filtered = productsApi.fetchAll()
    Promise.resolve(filtered)
    .then((result) => {
        setFilteredData(result)
    })  
    .catch((err:any)=>{
        throw err;
    })
  },[])

  if(filteredData !== null) return (
    <>
        <CommandPalette
        onChangeSearch={setSearch}
        onChangeOpen={setOpen}
        search={search}
        isOpen={open}
        page={page}
        >
        <CommandPalette.Page id="root">
            {filteredData.length ? (
            filteredData.map((list:any) => (
                <CommandPalette.List key={list.id} heading={list.heading}>
                {list.items.map(({ id, ...rest }:any) => (
                    <CommandPalette.ListItem
                    key={id}
                    index={getItemIndex(filteredData, id)}
                    {...rest}
                    />
                ))}
                </CommandPalette.List>
            ))
            ) : (
            <CommandPalette.FreeSearchAction />
            )}
        </CommandPalette.Page>

        <CommandPalette.Page id="projects">
            {/* Projects page */}
        </CommandPalette.Page>
        </CommandPalette>
    </>
  );
};

export default SearchBar;