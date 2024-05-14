import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Input, Typography } from "@material-tailwind/react";
import { keepPreviousData, useSuspenseQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import { USERS_QUERY_KEYS } from "../../constants/queryKeys";
import { searchWithEmail } from "../../apis/user";
import SearchResultList from "../Chat/Modal/InviteModal/SearchResultList";
import Button from "../Common/Button";

export default function SearchBar() {
  const [showSearchResult, setShowSearchResult] = useState(false);
  const { register, handleSubmit, reset, getValues, control } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const emailValue = useWatch({
    control,
    name: "email",
  });
  const debouncedValue = useDebounce(emailValue, 700);
  const {
    data: { data: searchData },
    refetch,
  } = useSuspenseQuery({
    queryKey: USERS_QUERY_KEYS.searchWithEmail(debouncedValue),
    queryFn: () => searchWithEmail({ email: debouncedValue }),
    placeholderData: keepPreviousData,
  });

  const handleDialogClose = () => {
    setShowSearchResult(false);
    reset({ email: "" });
  };

  useEffect(() => {
    if (!debouncedValue) return;

    setShowSearchResult(true);
    refetch();
  }, [debouncedValue, refetch, getValues]);
  return (
    <form onSubmit={handleSubmit(refetch)}>
      <div className="relative">
        <Input
          type="search"
          className="font-semibold !text-base !border-blue-gray-800 placeholder:text-blue-gray-800 text-white"
          placeholder="유저의 이메일을 검색해 보세요."
          labelProps={{
            className: "hidden",
          }}
          containerProps={{
            className: "min-w-0 h-10 rounded-[7px]",
          }}
          {...register("email")}
        />
        <Button
          size="sm"
          className="absolute right-1 top-1 bg-brand"
          onClick={handleDialogClose}
        >
          취소
        </Button>
      </div>
      {showSearchResult && (
        <div className="relative">
          {searchData.length === 0 ? (
            <Typography className="px-3 pt-2">
              "{debouncedValue}"로 검색된 결과가 존재하지 않습니다.
            </Typography>
          ) : (
            <SearchResultList
              color="black"
              absolute={true}
              searchData={searchData}
              onDialogClose={handleDialogClose}
            />
          )}
        </div>
      )}
    </form>
  );
}
