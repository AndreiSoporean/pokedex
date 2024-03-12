import classNames from "classnames";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons/icons";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  firstPage?: boolean;
  lastPage?: boolean;
  totalItems?: number;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  firstPage,
  lastPage,
  totalItems,
}: PaginationProps) => {
  const prevBtnStyles = classNames(
    "w-6 ",
    { "cursor-default text-amber-950": firstPage },
    { "cursor-pointer text-amber-600": !firstPage }
  );

  const nextBtnStyles = classNames(
    "w-6",
    { "cursor-default text-amber-950": lastPage },
    { "cursor-pointer text-amber-600": !lastPage }
  );

  return (
    <div className="flex gap-x-6 gap-2 text-amber-600 items-center justify-end md:items-center md:justify-end font-bold w-full">
      <div className="text-xs uppercase">
        total items: {totalItems} | page {currentPage} of {totalPages}
      </div>
      <div className="flex justify-end items-center gap-2">
        <div
          className={prevBtnStyles}
          onClick={() => {
            !firstPage && onPrev();
          }}
        >
          <ArrowLeftIcon />
        </div>
        <div
          className={nextBtnStyles}
          onClick={() => {
            !lastPage && onNext();
          }}
        >
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
