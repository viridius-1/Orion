module CategoryHelper
  def recursive_tree(node)
    node.children.each do |child|
      concat render partial: 'category_child', locals: { child: child }
    end; nil
  end

end
