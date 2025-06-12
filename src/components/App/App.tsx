import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteModal from "../NoteModal/NoteModal";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce<string>(query, 1000);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const loadNotes = useQuery({
    queryKey: ["Notes", debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const modalOpenFn = (): void => {
    setModalOpen(true);
  };

  const modalCloseFn = (): void => {
    setModalOpen(false);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={onChangeQuery} value={query} />
        {loadNotes.isSuccess && loadNotes.data.totalPages > 1 && (
          <Pagination
            pageCount={loadNotes.data.totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
        <button className={css.button} onClick={modalOpenFn}>
          Create note +
        </button>
      </header>
      {loadNotes.isPending && !loadNotes.isSuccess && (
        <p className={css.loading}>Loading your notes...</p>
      )}
      {loadNotes.isError && (
        <p className={css.loaderror}>
          An error occured: {JSON.stringify(loadNotes.error)}, please reload the
          page!
        </p>
      )}
      {loadNotes.isSuccess && <NoteList notes={loadNotes.data.notes} />}
      {modalOpen && <NoteModal onClose={modalCloseFn} />}
    </div>
  );
}
