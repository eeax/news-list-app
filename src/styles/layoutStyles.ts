import type { CSSProperties } from 'react';

export const layoutStyle: CSSProperties = {
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',
    display: 'flex',
    background: '#efefef',
};

export const headerStyle: CSSProperties = {
    height: 86,
    backgroundColor: '#4096ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const headerH1: CSSProperties = {
    color: '#fff',
    fontSize: 36,
}

export const contentStyle: CSSProperties = {
    width: '90vw',
    margin: '0 auto',
    paddingTop: 20,
    overflow: 'hidden',
};
