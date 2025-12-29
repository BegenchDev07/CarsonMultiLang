import "react-cmdk/dist/cmdk.css";
import CommandPalette from "react-cmdk";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { productsApi } from '../services/api';
import { useTranslation } from 'react-i18next';

interface SearchBarStatus {
  isOpen: boolean;
  onClose?: () => void;
}

interface SearchItem {
  id: string;
  children: string;
  href: string;
}

interface SearchList {
  heading: string;
  id: string;
  items: SearchItem[];
}

const SearchBar: React.FC<SearchBarStatus> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page] = useState<"root" | "projects">("root");
  const [open, setOpen] = useState<boolean>(isOpen);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<SearchList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sync isOpen prop with internal state
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Fetch all searchable data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await productsApi.fetchAll();
        if (result) {
          // Convert absolute URLs to relative paths
          const processedData = result.map((list: SearchList) => ({
            ...list,
            items: list.items.map((item: SearchItem) => {
              // Convert absolute URLs to relative paths
              let href = item.href;
              if (href.startsWith('https://skyeletronica.com')) {
                href = href.replace('https://skyeletronica.com', '');
              }
              return { ...item, href };
            })
          }));
          setFilteredData(processedData);
        } else {
          setFilteredData([]);
        }
      } catch (err: any) {
        console.error('Error fetching search data:', err);
        setError(err?.message || 'Failed to load search data');
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Flatten all items for indexing
  const allItems = useMemo(() => {
    if (!filteredData) return [];
    return filteredData.flatMap(list => list.items);
  }, [filteredData]);

  // Filter items based on search term
  const filteredLists = useMemo(() => {
    if (!filteredData || !search.trim()) return filteredData;

    return filteredData
      .map((list: SearchList) => {
        const filteredItems = list.items.filter((item: SearchItem) =>
          item.children.toLowerCase().includes(search.toLowerCase())
        );
        return filteredItems.length > 0 ? { ...list, items: filteredItems } : null;
      })
      .filter((list): list is SearchList => list !== null);
  }, [filteredData, search]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  const handleItemSelect = (item: SearchItem) => {
    if (item.href) {
      navigate(item.href);
      handleOpenChange(false);
    }
  };

  // Don't render if not open
  if (!open) return null;

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={handleOpenChange}
      search={search}
      isOpen={open}
      page={page}
    >
      <CommandPalette.Page id="root">
        {loading ? (
          <CommandPalette.List heading={t('products.loading') || 'Loading...'}>
            <CommandPalette.ListItem
              index={0}
              id="loading"
              children={t('products.loading') || 'Loading search results...'}
              disabled
            />
          </CommandPalette.List>
        ) : error ? (
          <CommandPalette.List heading={t('common.error') || 'Error'}>
            <CommandPalette.ListItem
              index={0}
              id="error"
              children={error}
              disabled
            />
          </CommandPalette.List>
        ) : filteredLists && filteredLists.length > 0 ? (
          filteredLists.map((list: SearchList) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map((item: SearchItem) => {
                const index = allItems.findIndex(i => i.id === item.id);
                return (
                  <CommandPalette.ListItem
                    key={item.id}
                    index={index >= 0 ? index : 0}
                    id={item.id}
                    children={item.children}
                    onClick={() => handleItemSelect(item)}
                  />
                );
              })}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id="projects">
        <CommandPalette.List heading="Projects">
          <CommandPalette.ListItem
            index={0}
            id="projects-placeholder"
            children="Projects coming soon"
            disabled
          />
        </CommandPalette.List>
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default SearchBar;