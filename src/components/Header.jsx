"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
export default function Header() {
  const [savePathname, setSavePathname] = useState("/");
  const [isMenuItem, setIsMenuItem] = useState([]);
  const location = useLocation();
  const { pathname } = location;

  const onClick = (e) => {
    setSavePathname(e.key);
  };
  useEffect(() => {
    if (pathname !== savePathname) {
      setSavePathname(pathname);
      return;
    } else {
      setSavePathname(pathname);
      return;
    }
  }, [pathname, savePathname]);
  useLayoutEffect(() => {
    const items = [
      {
        label: <Link to="/">前台</Link>,
        key: "/",
      },
      {
        label: <Link to="/back">後台</Link>,
        key: "/back",
      },
    ];
    setIsMenuItem(items);
  }, []);
  return (
    <Menu
      theme="dark"
      onClick={onClick}
      selectedKeys={[savePathname]}
      mode="horizontal"
      items={isMenuItem}
    />
  );
}
