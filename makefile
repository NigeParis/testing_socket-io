all:build

re: fclean all

build:
	@echo "dev build and run"
	@touch ./frontend/style.css
	@npx @tailwindcss/cli -i ./frontend/src/style.css -o ./frontend/style.css

run:	
	@gnome-terminal --title="frontend" -- bash -c "cd $(PWD)/frontend; zsh | npx vite;" 2>/dev/null
	@gnome-terminal --title="backend" -- bash -c "cd $(PWD)/backend; zsh | npx tsx index.ts;" 2>/dev/null

fclean:
	@rm -rf ./backend/index.js
	@rm -rf ~/.npm/_cacache
	@rm -rf ~/.local/share/pnpm/store
	@rm -rf ~/.cache/pnpm
	@pkill -f "backend" || true &
	@pkill -f "frontend" || true &
	wait

runMac:
	@osascript -e 'tell application "Terminal" to do script "cd $(PWD)/frontend && npx vite; exit"'
	@osascript -e 'tell application "Terminal" to do script "cd $(PWD)/backend && npx tsx index.ts; exit"'


.PHONY: all build clean run