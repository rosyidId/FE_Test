import { IconChevronDown, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const Pagination = () => {
  return (
    <div className="mt-2 flex gap-4 items-center">
      <div className="flex gap-1 items-center">
        <button className="border ">
          <IconChevronLeft className="text-[#D9D9D9]" />
        </button>
        <button className="border text-sm p-0.5  w-7 hidden md:block">1</button>
        <div className="text-[#D9D9D9] hidden md:flex w-8 text-center text-[14px]  justify-center items-center">
          • • •
        </div>
        <button className="border text-sm p-0.5  w-7 hidden md:block">4</button>
        <button className="border text-sm p-0.5  w-7 hidden md:block">5</button>
        <button className="border text-sm p-0.5  w-7 hidden md:block">6</button>
        <button className="border text-sm p-0.5  w-7 hidden md:block">7</button>
        <button className="border text-sm p-0.5  w-7 hidden md:block">8</button>
        <div className="text-[#D9D9D9] hidden md:flex w-8 text-center text-[14px] justify-center items-center">
          • • •
        </div>
        <button className="border text-sm p-0.5  w-7 hidden md:block">50</button>
        <button className="border ">
          <IconChevronRight className="text-[#D9D9D9]" />
        </button>
      </div>
      <div>
        <button className="flex gap-2 border px-2 py-0.5 items-center text-sm">
            <h3>10/page</h3>
            <IconChevronDown className="stroke " size={20}/>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="text-sm">Go to</h2>
        <input type="text" name="" id="" className="border w-20"/>
      </div>
    </div>
  );
};

export default Pagination;
