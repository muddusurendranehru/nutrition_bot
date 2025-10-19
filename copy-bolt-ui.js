// Copy Bolt UI Components to Current Project
const fs = require('fs');
const path = require('path');

async function copyBoltUI() {
  console.log('🎨 COPYING BOLT UI COMPONENTS...\n');

  const boltPath = 'C:\\Users\\pc\\Desktop\\project';
  const currentPath = '.';

  // Files to copy from Bolt
  const filesToCopy = [
    'src/components/AnimatedLanding.tsx',
    'src/components/FloatingNutritionBot.tsx',
    'src/components/SimpleNutritionBot.tsx',
    'src/components/ui/alert.tsx',
    'src/components/ui/badge.tsx',
    'src/components/ui/button.tsx',
    'src/components/ui/card.tsx',
    'src/components/ui/dialog.tsx',
    'src/components/ui/input.tsx',
    'src/components/ui/radio-group.tsx',
    'src/components/ui/select.tsx',
    'src/components/ui/textarea.tsx',
    'src/lib/utils.ts',
    'src/utils/nutritionDatabase.ts',
    'tailwind.config.js',
    'postcss.config.js',
    'tsconfig.app.json',
    'tsconfig.json',
    'tsconfig.node.json',
    'vite.config.ts'
  ];

  let successCount = 0;

  for (const file of filesToCopy) {
    try {
      const sourcePath = path.join(boltPath, file);
      const destPath = path.join(currentPath, file);
      
      // Create directory if it doesn't exist
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Copy file
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied: ${file}`);
      successCount++;
      
    } catch (error) {
      console.log(`❌ Failed: ${file} - ${error.message}`);
    }
  }

  console.log('\n' + '=' .repeat(60));
  console.log(`📊 RESULTS: ${successCount}/${filesToCopy.length} files copied`);
  console.log('=' .repeat(60));
  
  if (successCount === filesToCopy.length) {
    console.log('🎉 ALL BOLT UI COMPONENTS COPIED!');
    console.log('✅ Beautiful UI components ready!');
    console.log('✅ Professional medical interface ready!');
    console.log('✅ Multi-language support ready!');
    console.log('✅ Ready for integration!');
  } else {
    console.log('⚠️ Some files failed to copy - check paths');
  }
}

copyBoltUI();
