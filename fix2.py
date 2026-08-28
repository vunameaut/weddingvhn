import re

with open(r'D:\hoc tap\web\weddingvhn\src\components\ThemeSwitcher.tsx','r',encoding='utf-8') as f:
    c = f.read()

lines = c.split('\n')
fixed = []
count = 0
swatch_keys = ['pink', 'pink-dark', 'gold', 'gold-light', 'cream']

for line in lines:
    if 'background: hsl()' in line:
        key = swatch_keys[min(count, len(swatch_keys)-1)]
        line = line.replace('style={{ background: hsl() }}', 'style={{ background: ' + chr(96) + 'hsl(' + chr(36) + 'theme.colors.' + key + chr(125) + ')' + chr(96) + ' }}')
        count += 1
    fixed.append(line)

with open(r'D:\hoc tap\web\weddingvhn\src\components\ThemeSwitcher.tsx','w',encoding='utf-8') as f:
    f.write('\n'.join(fixed))
print('Fixed')
