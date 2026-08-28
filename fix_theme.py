import re

with open(r'D:\hoc tap\web\weddingvhn\src\components\ThemeSwitcher.tsx','r',encoding='utf-8') as f:
    lines = f.readlines()

fixed = []
for line in lines:
    # Line with setProperty
    if 'root.style.setProperty(--wedding-,' in line:
        line = line.replace('root.style.setProperty(--wedding-, val);', 'root.style.setProperty(' + chr(96) + '--wedding-' + chr(36) + '{key}' + chr(96) + ', val);')
    # Line with linear-gradient hsl()
    if 'root.style.background = linear-gradient(135deg, hsl()' in line:
        line = line.replace('root.style.background = linear-gradient(135deg, hsl() 0%, hsl() 50%, hsl() 100%);', 'root.style.background = ' + chr(96) + 'linear-gradient(135deg, hsl(' + chr(36) + 'theme.gradientStart' + chr(125) + ') 0%, hsl(' + chr(36) + 'theme.gradientEnd' + chr(125) + ') 50%, hsl(' + chr(36) + 'theme.gradientStart' + chr(125) + ') 100%)' + chr(96) + ';')
    # Line with background: hsl() in swatch
    if 'style={{ background: hsl(),' in line:
        line = line.replace("style={{ background: hsl(), border:", 'style={{ background: ' + chr(96) + 'hsl(' + chr(36) + 'theme.colors.cream' + chr(125) + ')' + chr(96) + ', border:')
    fixed.append(line)

with open(r'D:\hoc tap\web\weddingvhn\src\components\ThemeSwitcher.tsx','w',encoding='utf-8') as f:
    f.writelines(fixed)
print('Fixed')
