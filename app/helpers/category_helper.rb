module CategoryHelper
  def recursive_tree(node, level)
    node.children.each do |child|
      concat render partial: 'category_child', locals: { child: child, level: level }
    end; nil
  end
  
end
