import MainLayout from '../../components/layouts/MainLayout';

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
