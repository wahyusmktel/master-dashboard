import Chart from "react-apexcharts";
import { useTheme } from "@/components/theme-provider";
import { ApexOptions } from "apexcharts";

export default function RevenueChart() {
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const options: ApexOptions = {
    chart: {
      type: "area",
      fontFamily: "inherit",
      background: "transparent",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    colors: ["#ef4444"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: isDark ? "#94a3b8" : "#64748b",
          fontSize: "12px",
        },
      },
      tooltip: { enabled: false }, // Matikan tooltip di sumbu X biar gak dobel
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#94a3b8" : "#64748b",
          fontSize: "12px",
        },
        formatter: (value) => `Rp ${value}jt`,
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#1e293b" : "#f1f5f9",
      strokeDashArray: 4,
      padding: { top: 0, right: 0, bottom: 0, left: 10 },
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
    // --- UPDATED TOOLTIP CONFIG ---
    tooltip: {
      theme: isDark ? "dark" : "light",
      style: {
        fontSize: "12px",
      },
      x: {
        show: true,
      },
      y: {
        formatter: function (val) {
          return "Rp " + val + " Juta";
        },
      },
      marker: {
        show: false, // Hilangkan dot warna di tooltip biar lebih clean
      },
    },
  };

  const series = [
    {
      name: "Pendapatan",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 140, 160],
    },
  ];

  return (
    <div className="w-full h-full min-h-[300px]">
      {/* INJECT CSS KHUSUS BUAT TOOLTIP BIAR TRANSPARAN (GLASS EFFECT) */}
      <style>{`
        .apexcharts-tooltip {
          background: ${
            isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)"
          } !important;
          backdrop-filter: blur(4px);
          border: 1px solid ${isDark ? "#334155" : "#e2e8f0"} !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
          color: ${isDark ? "#fff" : "#000"} !important;
          border-radius: 8px !important;
        }
        .apexcharts-tooltip-title {
          background: transparent !important;
          border-bottom: 1px solid ${isDark ? "#334155" : "#e2e8f0"} !important;
          font-family: inherit !important;
          font-weight: 600 !important;
        }
        .apexcharts-tooltip-text {
          font-family: inherit !important;
        }
      `}</style>

      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
}
