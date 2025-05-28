import React from 'react';
import { motion } from 'framer-motion';
import PortfolioSummaryCard from '../components/dashboard/PortfolioSummaryCard';
import PortfolioChart from '../components/dashboard/PortfolioChart';
import TopHoldings from '../components/dashboard/TopHoldings';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import MarketNews from '../components/dashboard/MarketNews';
import WayneEnterprisesSummary from '../components/dashboard/WayneEnterprisesSummary';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Financial Dashboard</h1>
          <p className="text-gray-400">Overview of your financial empire, Mr. Wayne</p>
        </div>
        <div className="flex space-x-3">
          <button className="wayne-button-secondary">
            Generate Report
          </button>
          <button className="wayne-button-primary">
            New Transaction
          </button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Top row */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <PortfolioSummaryCard />
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-9">
          <PortfolioChart />
        </motion.div>
        
        {/* Middle row */}
        <motion.div variants={itemVariants} className="lg:col-span-6">
          <TopHoldings />
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-6">
          <RecentTransactions />
        </motion.div>
        
        {/* Bottom row */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <MarketNews />
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <WayneEnterprisesSummary />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;